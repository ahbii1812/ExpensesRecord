import { observable } from "mobx";
import StorageUtils from "./storageUtils";
import Moment from "moment";
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

  getDateSortedRecord(data, callback) {
    let recordListByDate = Object.values(data.reduce((record, item) => {
      if (!record[item.date]) record[item.date] = {
        title: item.date,
        data: []
      };
      record[item.date].data.push(item);
      return record;
    }, {}))
    const sortedByDate  = recordListByDate.sort((a,b) => new Moment(b.title).format('YYYYMMDD') - new Moment(a.title).format('YYYYMMDD'))
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

