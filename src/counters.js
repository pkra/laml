const config = {
  statements: {
    theorem: {
      fullname: "Theorem",
      counter: "statement"
    }
  },
  counters: {
    section: {
      appearance: "roman"
    },
    statement: {
      appearance: "arabic",
      numberwithin: "section"
    }
  }
};

// module.exports = function(document, config = defaultConfig) {
  let styles = {};
  
  for ( let counter_name of Object.keys(config.counters) ) {
    const counter = config.counters[counter_name];
    if ( counter.numberwithin ) {
      if ( !styles[counter.numberwithin] ) {
        styles[counter.numberwithin] = "";
      }
      styles[counter.numberwithin] += "counter-reset: " + counter_name + ";\n";
    } else {
      if ( !styles.body ) {
        styles.body = "";
      }
      styles.body += "counter-reset: " + counter_name + ";\n";
    }
    
  }
  
  for ( let statement_name of Object.keys(config.statements) ) {
    
  }
  
  let style = "";
  for ( let s of Object.keys(styles) ) {
    style += s + " {\n" + styles[s] + "}\n";
  }

  console.log( style );
// };



