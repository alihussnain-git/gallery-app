import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {CommentInput} from './CommentInput';
import appTheme from '../../../theme/appTheme';
import TestId from '../../../utils/testId';
import {strings} from '../../../locale/strings';
import {
  deleteComment,
  updateComment,
} from '../../../redux/slices/commentsSlice';
import {useDispatch} from 'react-redux';
import {showDeleteConfirmation} from '../../../utils/showDeleteConfirmation';

interface Props {
  comment: string;
  id: string;
  index: number;
}

export const CommentItem: React.FC<Props> = ({comment, id, index}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {isEditMode ? (
        <CommentInput
          onCancel={() => setIsEditMode(false)}
          onSend={text => {
            dispatch(updateComment({id, comment: text, indexToUpdate: index}));
            setIsEditMode(false);
          }}
          sendButtonText="Update"
          updateText={comment}
          sendButtonPlaceHolder="Update your comment"
          autoFocus
        />
      ) : (
        <View style={styles.container}>
          <Text style={styles.commentText}>{comment}</Text>
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              testID={TestId.editCommentButton}
              onPress={() => setIsEditMode(true)}
              style={styles.editDeleteCTA}>
              <Text>{strings.commentScreen.edit}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={TestId.deleteCommentButton}
              onPress={() => {
                showDeleteConfirmation(onDeleteConfirm);
                function onDeleteConfirm() {
                  dispatch(deleteComment({id, indexToDelete: index}));
                }
              }}
              style={styles.editDeleteCTA}>
              <Text style={{color: appTheme.colors.red}}>
                {strings.commentScreen.delete}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appTheme.colors.white,
    borderRadius: appTheme.spacing.xxSmall,
    padding: appTheme.spacing.xSmall,
    marginVertical: appTheme.spacing.xSmall,
    marginHorizontal: appTheme.spacing.xSmall,
  },
  commentText: {
    flex: 1,
  },
  ctaContainer: {
    flexDirection: 'row',
  },
  editDeleteCTA: {
    marginLeft: appTheme.spacing.xSmall,
  },
});
