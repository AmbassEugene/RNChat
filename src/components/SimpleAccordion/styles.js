import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    elevation: 1,
    marginBottom: 5,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2196f3',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold'
  },
  bodyContainer: {
    borderColor: '#eceff1',
    borderWidth: 1
  },
  bodyContent: {
    padding: 15,
    paddingVertical: 18,
  },
  footer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnOk: {
    color: '#2196f3'
  },
  btnCancel: {
    color: '#f44336'
  }

})