import { addBaseFieldsToDoc } from './addBaseFieldsToDoc';
import { DocStatus } from '../enums';

describe('ServerMongo:Functions:Doc', () => {
    beforeEach(() => {});

    it('addBaseFieldsToDoc()', () => {
        const initDoc: { [key: string]: any } = {};
        const final1 = addBaseFieldsToDoc(initDoc);
        expect(final1.status).toEqual(DocStatus.Active);
        expect(final1.createdDate).toBeInstanceOf(Date);
        expect(final1.modifiedDate).toBeInstanceOf(Date);

        const initDoc2 = {
            status: DocStatus.InActive,
            createdDate: new Date()
        };
        const final2 = addBaseFieldsToDoc(initDoc2);
        expect(final2.status).toEqual(DocStatus.InActive);
        expect(final2.createdDate.getTime()).toEqual(
            initDoc2.createdDate.getTime()
        );
        expect(final2.modifiedDate).toBeInstanceOf(Date);
    });
});
