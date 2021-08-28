import { observable } from "mobx";
import StorageUtils from "./storageUtils";
import moment from "moment";
import DeviceInfo from 'react-native-device-info'

class DataStore {
  constructor() {

  }
  @observable allCard = []
  @observable allRecord = []
  @observable deviceID = ""

  getDeviceID(callback) {
    this.deviceID = DeviceInfo.getUniqueId();
    callback && callback(this.deviceID)
  }

  getDateSortedRecord(callback) {
    let itemListByDate = Object.values(data.reduce((acc, item) => {
      if (!acc[item.Date]) acc[item.Date] = {
        Date: item.Date,
        ItemDetails: []
      };
      acc[item.Date].ItemDetails.push(item);
      return acc;
    }, {}))
    console.log("WJ itemListByDate", itemListByDate)
    const sortedByDate = itemListByDate.sort((a, b) => new moment(b.Date).format('DDMMYYYY') - new moment(a.Date).format('DDMMYYYY'))
    console.log("WJ sortedByDate", sortedByDate)
    return callback && callback(sortedByDate)
  }

  // getDateSortedRecord(callback) {
  //   let itemListByDate = Object.values(data.reduce((acc, item) => {
  //     if (!acc[item.Date]) acc[item.Date] = {
  //       Date: item.Date,
  //       ItemDetails: []
  //     };
  //     acc[item.Date].ItemDetails.push(item);
  //     return acc;
  //   }, {}))
  //   console.log("WJ itemListByDate", itemListByDate)
  //   const sortedByDate = itemListByDate.sort((a, b) => new moment(b.Date).format('DDMMYYYY') - new moment(a.Date).format('DDMMYYYY'))
  //   console.log("WJ sortedByDate", sortedByDate)
  //   return callback && callback(sortedByDate)
  // }
}

const dataStore = new DataStore();
export default dataStore;

