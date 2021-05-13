import {isNil} from 'lodash-es';

export const isNotNil: (value: any) => boolean = (value: any) => !isNil(value);
