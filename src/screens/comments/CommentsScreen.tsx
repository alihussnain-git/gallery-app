import React, {useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addComment, commentsSelector} from '../../redux/slices/commentsSlice';
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
      dispatch(
        addComment({
          id: id,
          comments: [...(comments || []), comment],
        }),
      );
      Keyboard.dismiss();
    },
    [dispatch, id, comments],
  );

  // Render item function for the comment list
  const renderItem = useCallback<ListRenderItem<string>>(
    ({item, index}) => {
      return <CommentItem index={index} id={id} key={index} comment={item} />;
    },
    [id],
  );

  const hasNoComments = !comments || comments.length === 0;
  return (
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
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: appTheme.spacing.medium,
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
