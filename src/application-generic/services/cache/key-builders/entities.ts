import {
  CacheKeyTypeEnum,
  IdentifierPrefixEnum,
  CacheKeyPrefixEnum,
  prefixWrapper,
  buildCommonKey,
  LISTING_IDENTIFIER,
} from './shared';

const buildListingsKey = (): string =>
  buildCommonKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.LISTING,
    identifierPrefix: IdentifierPrefixEnum.LISTING_ID,
    identifier: LISTING_IDENTIFIER,
  });

const buildListingKey = ({ listingId }: { listingId: string }): string =>
  buildCommonKey({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.LISTING,
    identifierPrefix: IdentifierPrefixEnum.LISTING_ID,
    identifier: listingId,
  });

const buildUserKey = ({ _id }: { _id: string }): string =>
  buildKeyById({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.USER,
    identifier: _id,
  });

const buildKeyById = ({
  type,
  keyEntity,
  identifierPrefix = IdentifierPrefixEnum.ID,
  identifier,
}: {
  type: CacheKeyTypeEnum;
  keyEntity: CacheKeyPrefixEnum;
  identifierPrefix?: IdentifierPrefixEnum;
  identifier: string;
}): string => prefixWrapper(`${type}:${keyEntity}:${identifierPrefix}=${identifier}`);

const buildAuthServiceKey = ({ apiKey }: { apiKey: string }): string =>
  buildKeyById({
    type: CacheKeyTypeEnum.ENTITY,
    keyEntity: CacheKeyPrefixEnum.AUTH_SERVICE,
    identifier: apiKey,
    identifierPrefix: IdentifierPrefixEnum.API_KEY,
  });

export { buildUserKey, buildKeyById, buildAuthServiceKey, buildListingKey, buildListingsKey };
