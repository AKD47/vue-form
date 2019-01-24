const app = new Vue({
    el: '#app',
    data: {
       title: 'Tasks list',
       items: [],
        itemTitle: '',
        itemDesc: ''
    },
    methods: {
        addItem: function () {
            if(this.itemTitle !== '' && this.itemDesc !== '') {
                const item = {};
                item.title = this.itemTitle;
                item.desc = this.itemDesc;
                this.items.push(item);
                this.itemTitle = '';
                this.itemDesc = '';
            }
        }
    }
});