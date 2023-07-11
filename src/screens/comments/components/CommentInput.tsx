import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {strings} from '../../../locale/strings';
import appTheme from '../../../theme/appTheme';

interface Props {
  sendButtonText?: string;
  onSend: (text: string) => void;
  onCancel?: () => void;
  updateText?: string;
  autoFocus?: boolean;
}

export const CommentInput: React.FC<Props> = ({
  onSend,
  sendButtonText,
  onCancel,
  updateText,
  autoFocus,
}) => {
  const [comment, setComment] = useState('');

  const handleTextChange = (text: string) => {
    setComment(text);
  };

  useEffect(() => {
    setComment(updateText || '');
  }, [updateText]);

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          testID="comment-input"
          style={styles.commentsInput}
          placeholder="Enter a comment"
          value={comment}
          onChangeText={handleTextChange}
          autoFocus={autoFocus}
        />
        <TouchableOpacity
          testID="send-button"
          hitSlop={appTheme.spacing.xSmall}
          onPress={() => {
            onSend(comment);
            setComment('');
          }}>
          <Text
            style={{
              color: sendButtonText
                ? appTheme.colors.blue
                : appTheme.colors.black,
            }}>
            {sendButtonText || strings.commentsInput.send}
          </Text>
        </TouchableOpacity>
        {onCancel && (
          <TouchableOpacity
            testID="cancel-button"
            style={{marginStart: appTheme.spacing.xxSmall}}
            hitSlop={appTheme.spacing.xSmall}
            onPress={onCancel}>
            <Text style={{color: appTheme.colors.red}}>
              {strings.commentsInput.cancel}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appTheme.colors.white,
    paddingVertical: Platform.select({
      ios: appTheme.spacing.xSmall,
      android: 0,
    }),
    paddingHorizontal: Platform.select({
      ios: appTheme.spacing.xSmall,
      android: appTheme.spacing.xxSmall,
    }),
    marginHorizontal: appTheme.spacing.xSmall,
    borderRadius: appTheme.spacing.xxSmall,
    marginVertical: appTheme.spacing.xSmall,
  },
  commentsInput: {
    flex: 1,
    paddingEnd: appTheme.spacing.xSmall,
  },
});
