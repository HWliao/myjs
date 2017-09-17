/**
 * 印章实行组件
 * Created by HWliao on 2017/9/17.
 */
(function () {
  'use strict';
  
  window.GzSealComponent = {
    template: '#seal',
    data: function () {
      return {
        test: 'seal',
        loading: false,
        items3: [],
        search: null,
        select: [],
        states: [
          "Alabama",
          "Alaska",
          "American Samoa",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Connecticut",
          "Delaware",
          "District of Columbia",
          "Federated States of Micronesia",
          "Florida",
          "Georgia",
          "Guam",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Marshall Islands",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Northern Mariana Islands",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Palau",
          "Pennsylvania",
          "Puerto Rico",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virgin Island",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming"
        ]
      };
    },
    watch: {
      search: function (val) {
        val && this.querySelections(val)
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true;
        // Simulated ajax query
        setTimeout(() => {
          this.items3 = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          });
          this.loading = false
        }, 500);
      }
    }
  };
})();
