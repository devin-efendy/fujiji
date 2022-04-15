const {
  getAllListingsByCity,
  getAllListingsByProvince,
  getAllListingsByCityCategory,
  getAllListingsByProvinceCategory,
  getAllListingsByCityCondition,
  getAllListingsByProvinceCondition,
  getAllListingsByCityPriceRange,
  getAllListingsByProvincePriceRange,
  createListing,
  updateListing,
  getListingById: queryByListingId,
  deleteListingById,
  getAllListingsDefault,
  getListingsBySearch,
} = require('../repositories/listing');
const { getUserByID } = require('../repositories/user');

const {
  APIError,
  ListingNotFound,
  ListingInvalidPriceRange,
  ListingInvalidCityProvince,
} = require('../errors');

function validatePriceRange(priceRange) {
  try {
    if (priceRange.length == 2
      && typeof priceRange[0] === 'string'
      && typeof priceRange[1] === 'string'
      && priceRange[0].indexOf('..') === -1
      && priceRange[1].indexOf('..') === -1) {
      if (priceRange[0] <= priceRange[1]) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return err;
  }
}

function validateMatchingCityProv(city, province) {
  try {
    const dictProvCities = {
      AB: ['Airdrie', 'Beaumont', 'Brooks',
        'Calgary', 'Camrose', 'Chestermere', 'Cold Lake',
        'Edmonton', 'Fort Saskatchewan', 'Grande Prairie', 'Lacombe',
        'Leduc', 'Lethbridge', 'Lloydminster', 'Medicine Hat',
        'Red Deer', 'Spruce Grove', 'St. Albert', 'Wetaskiwin',
      ],
      BC: ['Abbotsford', 'Armstrong', 'Burnaby', 'Campbell River',
        'Castlegar', 'Chilliwack', 'Colwood', 'Coquitlam',
        'Courtenay', 'Cranbrook', 'Dawson Creek', 'Delta',
        'Duncan', 'Enderby', 'Fernie', 'Fort St. John',
        'Grand Forks', 'Greenwood', 'Kamloops', 'Kelowna',
        'Kimberley', 'Langford', 'Langley', 'Maple Ridge',
        'Merritt', 'Mission', 'Nanaimo', 'Nelson', 'New Westminster',
        'North Vancouver', 'Parksville', 'Penticton', 'Pitt Meadows',
        'Port Alberni', 'Port Coquitlam', 'Port Moody', 'Powell River',
        'Prince George', 'Prince Rupert', 'Quesnel', 'Revelstoke',
        'Richmond', 'Rossland', 'Salmon Arm', 'Surrey', 'Terrace',
        'Trail', 'Vancouver', 'Vernon', 'Victoria', 'West Kelowna',
        'White Rock', 'Williams Lake',
      ],
      MB: ['Brandon', 'Dauphin', 'Flin Flon', 'Morden',
        'Portage la Prairie', 'Selkirk', 'Steinbach',
        'Thompson', 'Winkler', 'Winnipeg',
      ],
      NB: ['Bathurst', 'Campbellton', 'Dieppe', 'Edmundston',
        'Fredericton', 'Miramichi', 'Moncton', 'Saint John',
      ],
      NL: ['Corner Brook', 'Mount Pearl', "St. John's"],
      NS: ['Amherst', 'Bridgewater', 'Cape Breton', 'Halifax',
        'Kentville', 'New Glasgow', 'Truro', 'Yarmouth',
      ],
      ON: ['Barrie', 'Belleville', 'Brampton', 'Brant',
        'Brantford', 'Brockville', 'Burlington', 'Cambridge',
        'Clarence-Rockland', 'Cornwall', 'Dryden', 'Elliot Lake',
        'Greater Sudbury', 'Hamilton', 'Kenora', 'Kingston',
        'Kitchener', 'London', 'Markham', 'Mississauga',
        'Niagara Falls', 'Oshawa', 'Ottawa', 'Thunder Bay',
        'Toronto', 'Vaughan', 'Waterloo',
      ],
      PE: ['Charlottetown', 'Summerside'],
      QC: ['Acton Vale', 'Alma', 'Amos', 'Amqui', 'Barkmere',
        'Beauceville', 'Bedford', 'Blainville', 'Boucherville',
        'Carignan', 'Chandler', 'Clermont', 'Danville', 'Dunham',
        'Fermont', 'Hudson', 'Laval', 'Mercier', 'Montmagny',
        'Montreal', 'New Richmond', 'Richmond', 'Windsor',
      ],
      SK: ['Estevan', 'Flin Flon', 'Humboldt', 'Lloydminster',
        'Martensville', 'Meadow Lake', 'Melfort', 'Melville',
        'Moose Jaw', 'North Battleford', 'Prince Albert',
        'Regina', 'Saskatoon', 'Swift Current', 'Warman',
        'Weyburn', 'Yorkton',
      ],
    };

    return (dictProvCities[province].includes(city));
  } catch (err) {
    return err;
  }
}

async function getAllListingsBySearch(req, res, next) {
  try {
    let listings = {};
    const searchParameters = {
      title: req.query.title,
      condition: req.query.condition,
      category: req.query.category,
      city: req.query.city,
      province: req.query.province,
      startPrice: req.query.startPrice,
      endPrice: req.query.endPrice,
    };

    listings = await getListingsBySearch(searchParameters);

    if (listings.length === 0) {
      next(new ListingNotFound());
      return;
    }

    if (listings instanceof APIError) {
      next(listings);
      return;
    }
    res.status(200).json({ listings });
  } catch (err) {
    next(new APIError());
  }
}

async function getListingsByCity(req) {
  try {
    let listings = {};

    if (req.query.category) {
      listings = await getAllListingsByCityCategory(
        req.query.city,
        req.query.category,
      );
    } else if (req.query.condition) {
      listings = await getAllListingsByCityCondition(
        req.query.city,
        req.query.condition,
      );
    } else if (req.query.priceRange) {
      if (!validatePriceRange(req.query.priceRange)) {
        return new ListingInvalidPriceRange();
      }
      listings = await getAllListingsByCityPriceRange(
        req.query.city,
        req.query.priceRange[0],
        req.query.priceRange[1],
      );
    } else {
      listings = await getAllListingsByCity(req.query.city);
    }

    return listings;
  } catch (err) {
    return err;
  }
}

async function getListingsByProvince(req) {
  try {
    let listings = {};

    if (req.query.category) {
      listings = await getAllListingsByProvinceCategory(
        req.query.provinceCode,
        req.query.category,
      );
    } else if (req.query.condition) {
      listings = await getAllListingsByProvinceCondition(
        req.query.provinceCode,
        req.query.condition,
      );
    } else if (req.query.priceRange) {
      if (!validatePriceRange(req.query.priceRange)) {
        return new ListingInvalidPriceRange();
      }
      listings = await getAllListingsByProvincePriceRange(
        req.query.provinceCode,
        req.query.priceRange[0],
        req.query.priceRange[1],
      );
    } else {
      listings = await getAllListingsByProvince(req.query.provinceCode);
    }

    return listings;
  } catch (err) {
    return err;
  }
}

async function getAllListings(req, res, next) {
  try {
    let listings = {};

    if (req.query.city) {
      listings = await getListingsByCity(req);
    } else if (req.query.provinceCode) {
      listings = await getListingsByProvince(req);
    } else {
      listings = await getAllListingsDefault();
    }

    if (listings.length === 0) {
      next(new ListingNotFound());
      return;
    }

    if (listings instanceof APIError) {
      next(listings);
      return;
    }
    res.status(200).json({ listings });
  } catch (err) {
    next(new APIError());
  }
}

async function getByListingId(req, res, next) {
  try {
    const listingID = req?.params?.id;

    const listing = await queryByListingId(listingID);

    if (!listing) {
      return next(
        new ListingNotFound(`Listing with id: ${listingID} is not found.`),
      );
    }

    const user = await getUserByID(listing.user_id);

    return res
      .status(200)
      .json({ listing: { ...listing, contact_email: user.email_address } });
  } catch (err) {
    return next(new APIError());
  }
}

async function postListing(req, res, next) {
  try {
    const {
      userID,
      title,
      condition,
      category,
      city,
      provinceCode,
      imageURL,
      price,
      description,
    } = req.body;

    if (!validateMatchingCityProv(city, provinceCode)) {
      next(new ListingInvalidCityProvince(`
        No city named ${city} in the selected province, ${provinceCode}.
      `));
      return;
    }

    const newListing = await createListing(
      userID,
      title,
      condition,
      category,
      city,
      provinceCode,
      imageURL,
      price,
      description,
    );

    res.status(200).json({
      listingId: newListing.listing_id,
    });
  } catch (err) {
    next(new APIError(err, 500));
  }
}

async function editListing(req, res, next) {
  try {
    const {
      userID,
      listingID,
      title,
      condition,
      category,
      city,
      provinceCode,
      imageURL,
      price,
      description,
    } = req.body;

    if (!validateMatchingCityProv(city, provinceCode)) {
      return next(new ListingInvalidCityProvince(`
        No city named ${city} in the selected province, ${provinceCode}.
      `));
    }

    await updateListing(
      userID,
      listingID,
      title,
      condition,
      category,
      city,
      provinceCode,
      imageURL,
      price,
      description,
    );

    const updatedListing = await queryByListingId(parseInt(listingID, 10));
    return res.status(200).json({ updatedListing });
  } catch (err) {
    return next(new APIError(err, 500));
  }
}

async function deleteListing(req, res, next) {
  try {
    const listingID = req?.params?.id;
    const { id } = req.locals.userData;

    const listing = await deleteListingById(listingID, id);

    if (listing === 0) {
      return next(
        new ListingNotFound(`Listing with id: ${listingID} is not found.`),
      );
    }

    return res.status(200).json({ data: listing });
  } catch (err) {
    return next(new APIError());
  }
}

module.exports = {
  getAllListings,
  getByListingId,
  postListing,
  editListing,
  deleteListing,
  getAllListingsBySearch,
};
