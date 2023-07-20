import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
} from 'react-native';
import {strings} from '../../../locale/strings';
import appTheme from '../../../theme/appTheme';
import TestId from '../../../utils/testId';

interface Props {
  sendButtonText?: string;
  sendButtonPlaceHolder?: string;
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
  sendButtonPlaceHolder,
}) => {
  const [comment, setComment] = useState('');

  const handleTextChange = (text: string) => {
    setComment(text);
  };

  useEffect(() => {
    setComment(updateText || '');
  }, [updateText]);

  const handleOnSendPress = () => {
    const newComment = comment.trim();
    if (!newComment) {
      Alert.alert('Comment box is empty!', 'Please write a comment first');
      return;
    }
    onSend(newComment);
    setComment('');
  };

  const sendButtonColor = sendButtonText
    ? appTheme.colors.blue
    : appTheme.colors.black;
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          testID={TestId.commentInput}
          style={styles.commentsInput}
          placeholder={sendButtonPlaceHolder || 'Enter a comment'}
          value={comment}
          onChangeText={handleTextChange}
          autoFocus={autoFocus}
        />
        <TouchableOpacity
          testID={TestId.sendCommentButton}
          hitSlop={appTheme.spacing.xSmall}
          onPress={handleOnSendPress}>
          <Text
            style={{
              color: sendButtonColor,
            }}>
            {sendButtonText || strings.commentsInput.send}
          </Text>
        </TouchableOpacity>
        {onCancel && (
          <TouchableOpacity
            testID={TestId.cancelCommentButton}
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
