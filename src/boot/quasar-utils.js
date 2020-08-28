import { copyToClipboard, openURL } from "quasar";
import { date } from 'quasar'

window.openURL = openURL;
window.copyToClipboard = copyToClipboard;
window.quasarDate = date;
