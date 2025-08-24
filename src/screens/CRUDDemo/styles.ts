import { StyleSheet } from 'react-native';
import { PRIMARY_BG, WHITE, SECONDARY_BG } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BG,
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  postsList: {
    maxHeight: 300,
  },
  postItem: {
    marginBottom: 8,
  },
  postButton: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  postDetail: {
    marginBottom: 8,
    lineHeight: 20,
  },
  input: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 8,
    minWidth: 80,
  },
});