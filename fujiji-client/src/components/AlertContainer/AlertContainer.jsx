import PropTypes from 'prop-types';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

/**
 *
/**
 * @param {string} headerText
 * @param {string} contentText
 * @param {string} confirmButtonText
 * @param {string} confirmButtonColor
 * @param {string} cancelButtonText
 * @param {bool} isOpen whether the the Alert dialog should show or not
 * @param {ref} cancelRef ref to the Component that trigger this alert
 * @param {func} onClose callback function to close the Alert dialog
 * @param {func} onConfirm callback function when confirming the changes
 */
export default function AlertContainer({
  headerText,
  contentText,
  confirmButtonText,
  confirmButtonColor = 'red',
  cancelButtonText,
  isOpen = false,
  cancelRef,
  onClose,
  onConfirm,
}) {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent mx="3">
        <AlertDialogHeader>{headerText}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{contentText}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button colorScheme={confirmButtonColor} ml={3} onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

AlertContainer.propTypes = {
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  cancelButtonText: PropTypes.string,
  isOpen: PropTypes.bool,
  cancelRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
