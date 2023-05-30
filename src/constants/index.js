export const MAX_LENGTH_CHARACTER = 200;
export const DEFAULT_LIMIT = 30;
export const ACTIVITY_STATUS = {
  LISTING: 0,
  CANCEL: 1,
  UPDATE: 2,
  OFFER: 3,
  CANCEL_OFFER: 4,
  ACCEPT_OFFER: 5,
  COMPLETE: 6,
  TRANSFER: 7,
  MINT: 8,
  COLLECTION_OFFER: 11,
  AUCTION_START: 12,
  AUCTION_BID: 13,
  AUCTION_SETTLE: 14,
};

export const ACTIVITY_STATUS_FILTER = [
  {
    label: "Listing",
    value: 0,
  },
  {
    label: "Sale",
    value: 6,
  },
  {
    label: "Transfer",
    value: 7,
  },
  {
    label: "Mint",
    value: 8,
  },
  {
    label: "Offer",
    value: 3,
  },
  {
    label: "Collection Offer",
    value: 5,
  },
];

export const OFFER_OPTIONS = [
  {
    label: "1 day",
    value: "1d",
  },
  {
    label: "3 days",
    value: "3d",
  },
  {
    label: "7 days",
    value: "7d",
  },
  {
    label: "14 days",
    value: "14d",
  },
  {
    label: "30 days",
    value: "30d",
  },
  {
    label: "90 days",
    value: "90d",
  },
  {
    label: "180 days",
    value: "180d",
  },
];

export const MARKET_ADDRESS = "0x0000000000000000000000000000000000000000";

export const SOCKET_EVENTS = {
  LISTING: "listing-event",
  UPDATE_LISTING: "update-listing-event",
  DELIST: "delist-event",
  BUY: "buy-event",
  OFFER: "offer",
  CANCEL_OFFER: "cancel-offer-event",
  ACCEPT_OFFER: "accept-offer-event",
  MINT: "mint-event",
  TRANSFER: "transfer-event",
  JOIN: "join",
};

export const VERIFIED_TYPE = {
  VERIFIED: 1,
  UNVERIFIED: 0,
};

export const TOP_RANK = {
  TOP_1: 1,
  TOP_10: 10,
  TOP_25: 25,
};

export const TOCE_COIN_TYPE =
  "0xd2013e206f7983f06132d5b61f7c577638ff63171221f4f600a98863febdfb47::toce::TOCE";
