import React, { ReactNode, useCallback } from 'react';
import { Modal, Pressable, Text, StyleSheet, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';

interface Props {
  isLoading: boolean,
  error: unknown | null,
  children: ReactNode
}

const DetailsModal = ({isLoading, error, children}: Props) => {
  const navigate = useNavigate();

  const details = useCallback(() => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (error !== null) {
      return <Text>{JSON.stringify(error)}</Text>;
    }

    return children;
  }, [isLoading, error, children]);

  const onClose = () => {
    navigate(-1);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <Pressable
          style={styles.buttonClose}
          onPress={onClose}>
          <Text style={styles.buttonCloseText}>X</Text>
        </Pressable>
        <ScrollView style={styles.details}>
          {details()}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginTop: '40%',
    marginLeft: '5%',
    marginRight: '5%',
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  buttonClose: {
    position: 'absolute',
    top: '2.5%',
    right: '5%',
    zIndex: 50,
    borderRadius: 9999,
    borderColor: 'rgb(255, 255, 255)',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'rgb(0, 0, 0)',
    overflow: 'hidden',
  },
  buttonCloseText: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
    includeFontPadding: false,
    fontSize: 12,
    fontWeight: '700',
    color: 'rgb(255, 255, 255)'
  },
  details: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
  }
});

export default DetailsModal;
