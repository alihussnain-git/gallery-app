import React, {useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  Alert,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  commentsSelector,
  populateComment,
} from '../../redux/slices/commentsSlice';
import {NavigationProps} from '../../navigation/RootNavigator';
import appTheme from '../../theme/appTheme';
import {RootState} from '../../redux/store';
import {strings} from '../../locale/strings';
import {CommentItem} from './components/CommentItem';
import {CommentInput} from './components/CommentInput';
import TestId from '../../utils/testId';

const CommentsScreen: React.FC<NavigationProps> = ({route}) => {
  const {id} = route.params;
  // Select comments from the Redux store
  const comments = useSelector((rootState: RootState) =>
    commentsSelector(rootState, id),
  );
  const dispatch = useDispatch();

  // Callback function to handle adding a new comment
  const handleAddComment = useCallback(
    (comment: string) => {
      const newComment = comment.trim();
      if (newComment) {
        if (comments?.length) {
          dispatch(
            populateComment({
              id: id,
              comments: [...comments, newComment],
            }),
          );
        } else {
          dispatch(
            populateComment({
              id: id,
              comments: [newComment],
            }),
          );
        }
        Keyboard.dismiss();
        return;
      }
      Alert.alert('Comment box is empty!', 'Please write a comment first');
    },
    [dispatch, id, comments],
  );

  // Callback function to handle updating a comment
  const handleUpdateComment = useCallback(
    (comment: string, indexToUpdate: number) => {
      if (comments) {
        const updatedComments = [...comments];
        updatedComments[indexToUpdate] = comment;
        dispatch(
          populateComment({
            id: id,
            comments: [...updatedComments],
          }),
        );
      }
    },
    [dispatch, comments, id],
  );

  // Callback function to handle deleting a comment
  const handleDeleteComment = useCallback(
    (indexToDelete: number) => {
      if (comments) {
        Alert.alert(
          'Delete Comment',
          'Are you sure you want to delete this comment?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const updatedComments = [...comments];
                updatedComments.splice(indexToDelete, 1);
                dispatch(
                  populateComment({
                    id: id,
                    comments: [...updatedComments],
                  }),
                );
              },
            },
          ],
        );
      }
    },
    [dispatch, id, comments],
  );

  // Render item function for the comment list
  const renderItem = useCallback<ListRenderItem<string>>(
    ({item, index}) => {
      return (
        <CommentItem
          key={index}
          onDelete={() => handleDeleteComment(index)}
          onUpdate={comment => handleUpdateComment(comment, index)}
          comment={item}
        />
      );
    },
    [handleDeleteComment, handleUpdateComment],
  );

  const hasNoComments = !comments || comments.length === 0;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 108 : 0}
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        style={styles.container}>
        {hasNoComments && (
          <>
            <Text style={styles.emptyText}>
              {strings.commentScreen.noComments}
            </Text>
            <Text style={styles.emptySubText}>
              {strings.commentScreen.beTheFirst}
            </Text>
          </>
        )}
        <FlatList
          testID={TestId.commentsList}
          data={comments}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
        <CommentInput onSend={handleAddComment} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: appTheme.typography.fontSizes.h3,
    marginVertical: appTheme.spacing.medium,
  },
  emptySubText: {
    alignSelf: 'center',
  },
  listTitle: {
    textAlign: 'center',
    fontSize: appTheme.typography.fontSizes.h5,
    marginVertical: appTheme.spacing.medium,
  },
});
