const yaml = require('js-yaml');

module.exports = function(document) {
  // convert yaml to json metadata
  // TODO read first text node if it looks like YAML
  const yamlNode = document.querySelector('script[type="application/yaml"]');
  if (!yamlNode) return ;
  const yamldata = yaml.safeLoad(yamlNode.text);
  if (!yamldata) return ;
  const metadata = document.createElement('script');
  metadata.setAttribute('type', 'application/json');
  metadata.setAttribute('data-laml', 'metadata');
  metadata.text = JSON.stringify(yamldata);
  document.head.appendChild(metadata);
  // clean up
  yamlNode.parentNode.removeChild(yamlNode);
};
