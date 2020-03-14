import { DocStatus } from '../enums';

export function addBaseFieldsToDoc<T>(
    doc: T
): T & { status: DocStatus; createdDate: Date; modifiedDate: Date } {
    const newDoc: T & {
        status: DocStatus;
        createdDate: Date;
        modifiedDate: Date;
    } = {
        status: undefined,
        createdDate: undefined,
        modifiedDate: undefined,
        ...doc
    };
    if (typeof newDoc.status === 'undefined' || newDoc.status === null) {
        newDoc.status = DocStatus.Active;
    }
    if (
        typeof newDoc.createdDate === 'undefined' ||
        newDoc.createdDate === null
    ) {
        newDoc.createdDate = new Date();
    }
    if (
        typeof newDoc.modifiedDate === 'undefined' ||
        newDoc.modifiedDate === null
    ) {
        newDoc.modifiedDate = new Date();
    }
    return newDoc;
}
