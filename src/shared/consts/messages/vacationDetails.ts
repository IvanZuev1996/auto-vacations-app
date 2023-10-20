export enum MessagesEnum {
    pendingStatus = 'pendingStatus',
    successStatus = 'successStatus'
}

export const adminMessages: Record<MessagesEnum, string> = {
    [MessagesEnum.pendingStatus]: 'Для этой заявки требуется ваше действие',
    [MessagesEnum.successStatus]: 'Данная заявка согласована'
};

export const userMessages: Record<string, string> = {
    [MessagesEnum.pendingStatus]: 'Для этой заявки требуется ваше действие'
};
