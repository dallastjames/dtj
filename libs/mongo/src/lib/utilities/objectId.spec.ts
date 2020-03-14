import { ObjectId, createObjectId, parseObjectId } from './ObjectId';

describe('ServerMongo:Utilities:ObjectId', () => {
    beforeEach(() => {});

    it('createObjectId()', () => {
        const id = new ObjectId();
        const created = createObjectId(id);
        expect(created.equals(id)).toBeTruthy();
        expect(id.equals(createObjectId())).toBeFalsy();
        const created2 = createObjectId();
        expect(created2.equals(id)).toBeFalsy();
        expect(created2).toBeInstanceOf(ObjectId);
    });

    it('parseObjectId()', () => {
        const def = new ObjectId();
        const id = new ObjectId();
        const parsed = parseObjectId(id, def);
        expect(parsed.equals(id)).toBeTruthy();
        expect(parsed.equals(def)).toBeFalsy();
        const parsed2 = parseObjectId(null, def);
        expect(parsed2.equals(id)).toBeFalsy();
        expect(parsed2.equals(def)).toBeTruthy();
        const parsed3 = parseObjectId(null, null);
        expect(parsed3).toBeFalsy();
    });
});
