import {Alert} from 'react-native';

export const showDeleteConfirmation = (onConfirm: () => void) => {
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
        onPress: onConfirm,
      },
    ],
  );
};
