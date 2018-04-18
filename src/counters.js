const config = {
  statements: {
    theorem: {
      fullname: "Theorem",
      counter: "statement"
    },
    lemma: {
      fullname: "Lemma",
      counter: "statement"
    },
    question: {
      fullname: "Question",
      counter: "question"
    },
    section: {
      fullname: "\00A7",
      counter: "section"
    }
  },
  counters: {
    section: {
      appearance: "roman"
    },
    statement: {
      appearance: "arabic",
      numberwithin: "section"
    },
    question: {
      appearance: "arabic"
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
      styles[counter.numberwithin] += "  counter-reset: " + counter_name + ";\n";
    } else {
      if ( !styles["body"] ) {
        styles["body"] = "";
      }
      styles["body"] += "  counter-reset: " + counter_name + ";\n";
    }
  }
  
  for ( let statement_name of Object.keys(config.statements) ) {
    const counter_name = config.statements[statement_name].counter;
    if ( !styles[statement_name] ){
      styles[statement_name] = "";
    }
    styles[statement_name] += "  counter-increment: " + counter_name + ";\n";
    const nw = config.counters[counter_name].numberwithin;
    if ( !styles[statement_name + " > h3::after"] ) {
      styles[statement_name + " > h3::after"] = "";
    }
    if ( nw ) {
      styles[statement_name + " > h3::after"] += "  content: \" \" counter("
        + nw + ") \".\" "
        + "counter(" + statement_name + ") \". \";\n";
    } else {
      styles[statement_name + " > h3::after"] += "  content: \" \" counter("
        + statement_name + ") \". \";\n";
    }
    
  }
  
  let style = "";
  for ( let s of Object.keys(styles) ) {
    style += s + " {\n" + styles[s] + "}\n";
  }

  console.log( style );
// };



