<template>
  <div style="display:inline-block;">
    <slot></slot>
    <el-date-picker
      v-model="date"
      type="daterange"
      placeholder="选择日期范围"
      :clearable="false"
      @change="dateWatcher"
      :pickerOptions="pickerOptions">
    </el-date-picker>
  </div>
</template>
<script>
const HOUR = 3600 * 1000,
      DAY = 24 * HOUR;
export default {
  name: "DatePicker",
  props: {
    value: Array,
    dateWatcher: Function,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: (date) => {
          return date > +new Date();
        },
      },
    };
  },
  computed: {
    date: {
      get() {
        return this.value;
      },
      set(newVal) {
        let end = +newVal[1]
        newVal[1] = new Date(end + DAY - 100)
        this.$emit("input", newVal);
      },
    },
  },
  methods: {
  },
  mounted() {
  },
};
</script>
