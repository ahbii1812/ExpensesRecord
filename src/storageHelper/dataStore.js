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
}

const dataStore = new DataStore();
export default dataStore;

