<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      money: 100,
      options: [{
        value: 1,
        text: 1
      }, {
        value: 2,
        text: 2
      }, {
        value: 3,
        text: 3
      }]
    }
  },
  methods: {
    handleClick() {}
  },
  render(h) {
    const moneyNode = (
      <p>{ this.money > 99 ? 99 : this.money }</p>
    );

    return (
      <ul class="list">
        {
          this.options.map((item, index) => {
            return (
              // <li>{ item.text }</li>
              <content
                onClick={this.handleClick}
                item={item}
                value={item.value}
                key={index}>
                { moneyNode }  
              </content>
            )
          })
        }
      </ul>
    )
  }
  // node => script (return node)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
