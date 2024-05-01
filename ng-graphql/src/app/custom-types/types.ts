export type GUID = string & { isGuid: true };
export class EmptyGUID {
    static readonly value: GUID = '00000000-0000-0000-0000-000000000000' as GUID;
}