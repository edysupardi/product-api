import { SetMetadata } from '@nestjs/common';

export const CUSTOM_MESSAGE_KEY = 'customMessage';
export const CustomMessage = (message: string) => SetMetadata(CUSTOM_MESSAGE_KEY, message);