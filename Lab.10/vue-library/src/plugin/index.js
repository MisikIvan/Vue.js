import Button from '../components/Button.vue';
import Select from '../components/Select.vue';
import Alert from '../components/Alert.vue';
import Input from '../components/Input.vue';

export default {
  install(app) {
    app.component('Button', Button);
    app.component('Select', Select);
    app.component('Alert', Alert);
    app.component('Input', Input);
  }
};
