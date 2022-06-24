import React, { memo } from 'react';

import TextInput, { TextInputProps } from '../TextInput/TextInput';

export type EmailInputProps = TextInputProps;

export const EmailInput: React.FunctionComponent<EmailInputProps> = props => <TextInput {...props} />;

EmailInput.defaultProps = {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoCompleteType: 'email',
    textContentType: 'emailAddress',
    maxLength: 320,
};

export default memo(EmailInput);
