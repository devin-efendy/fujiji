import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Box, Center, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useSession } from '../../../context/session';
import { Message, withSession } from '../../../components';
import {
  getConversationsByConversationId,
  getMessagesByConversationId,
  postMessage,
} from '../../../server/api';
import styles from './index.module.css';

function ConversationPage({ params }) {
  const { userData, authToken } = useSession();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [receiverID, setReceiverID] = useState('');
  const scrollRef = useRef();
  const socket = useRef();
  const URL = 'https://fujiji-socket.azurewebsites.net';
  socket.current = io(URL, { autoConnect: false, transports: ['websocket'] });
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      const res = await getConversationsByConversationId(
        params.conversationId,
        authToken,
      );
      if (res.error) {
        toast({
          title: 'Oops! Not able to grab the conversations...',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } else {
        const receiver = (typeof window === 'undefined' ? false : parseInt(res[0].senderID, 10) === parseInt(userData?.userID, 10))
          ? res[0].receiverID
          : res[0].senderID;
        setReceiverID(receiver);
      }
    }
    fetchData();
  }, [authToken, params.conversationId, toast, userData?.userID]);

  useEffect(() => {
    socket.current.connect();
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        receiverID: data?.receiverID,
        conversationID: params.conversationId,
        senderID: data?.senderID,
        message: data?.text,
      });
    });
  }, [params.conversationId]);

  useEffect(() => {
    if (
      (arrivalMessage && Number(userData?.userID) === Number(arrivalMessage?.senderID))
      || Number(userData?.userID) === Number(arrivalMessage?.receiverID)
    ) {
      const message = {
        conversationID: arrivalMessage.conversationID,
        senderID: arrivalMessage.senderID,
        message: arrivalMessage.message,
      };
      setMessages((m) => [...m, message]);
    }
  }, [arrivalMessage, params.conversationId, userData?.userID]);

  useEffect(() => {
    socket.current.emit('addUser', userData?.userID);
  }, [userData?.userID]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getMessagesByConversationId(
          params.conversationId,
          authToken,
        );
        setMessages(res);
      } catch (err) {
        toast({
          title: 'Oops! Not able to grab the message...',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    };
    getMessages();
  }, [params.conversationId, authToken, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.current.connect();
    const message = {
      senderID: userData?.userID,
      message: newMessage,
      conversationID: params.conversationId,
      authToken,
    };

    socket.current.emit('sendMessage', {
      senderID: userData?.userID,
      receiverID,
      text: newMessage,
    });

    try {
      const res = await postMessage(message);
      setMessages([...messages, res]);
      setNewMessage('');
    } catch (err) {
      toast({
        title: 'Oops! Not able to send the message...',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box w="100%" h="100vh" bgGradient={['linear(to-b,white, teal.500)']}>
      <Center px="1" py="6" flexDir="column">
        <div className={styles.messenger}>
          <div className={styles.chatBox}>
            <div className={styles.chatBoxWrapper}>
              <div className={styles.chatBoxTop}>
                {messages?.map((m) => (
                  <div>
                    <Message message={m} own={Number(m.senderID) === Number(userData?.userID)} />
                  </div>
                ))}
              </div>
              <div className={styles.chatBoxBottom}>
                <textarea
                  className={styles.chatMessageInput}
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <button type="button" className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </Center>
    </Box>

  );
}

export async function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}

ConversationPage.propTypes = {
  params: PropTypes.string,
};

export default withSession(ConversationPage);
