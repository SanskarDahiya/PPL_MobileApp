import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  MainBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1eff2',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderColor: '#e87818',
    marginTop: 10,
  },
  userInfo_dateTime: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topPortion: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    color: '#e87818',
    fontSize: 20,
    lineHeight: 20,
    paddingVertical: 5,
  },
  categori: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#ee830d',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderLeftColor: '#f3891f',
    borderLeftWidth: 4,
  },
  btmButton: {
    backgroundColor: '#f3891f',
    flexDirection: 'row',
    borderColor: '#ee830d',
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: '1%',
    paddingVertical: '0.5%',
  },
  bottomBtns: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  topline: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
  },
  alertMsg: {
    maxWidth: '70%',
    color: 'red',
  },
  placeholder: {
    maxWidth: '30%',
    paddingLeft: 5,
  },
  textbox: {
    borderWidth: 1,
    borderRadius: 4,
    minWidth: '100%',
    maxWidth: '100%',
    paddingHorizontal: 5,
  },
  content: {
    minWidth: '85%',
    maxWidth: '85%',
    position: 'relative',
    marginVertical: '1%',
  },
  main: {},
  bottomBar: {
    marginTop: '2%',
  },
});
