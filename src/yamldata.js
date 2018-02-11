const yaml = require('js-yaml');

module.exports = function(document) {
  // convert yaml to json metadata
  // TODO think about schema.org markup
  const yamldata = yaml.safeLoad(document.querySelector('script[type="application/yaml"]').text);
  if (!yamldata) return ;
  const metadata = document.createElement('script');
  metadata.setAttribute('type', 'application/json');
  metadata.setAttribute('data-laml', 'metadata');
  metadata.text = JSON.stringify(yamldata);
  document.head.appendChild(metadata);
};
