export default function Footer(){
  return (
    <footer className="w3-container w3-center w3-padding-32 w3-light-grey">
      <div className="w3-row">
        <div className="w3-third">
          <h3>Security References</h3>
          <ul className="w3-ul">
            <li><a href="/topics/api-security">API Security</a></li>
            <li><a href="/topics/cloud-security">Cloud Security</a></li>
            <li><a href="/topics/container-security">Container Security</a></li>
            <li><a href="/topics/identity-access">Identity & Access</a></li>
            <li><a href="/topics">All References</a></li>
          </ul>
        </div>
        <div className="w3-third">
          <h3>Implementation Guides</h3>
          <ul className="w3-ul">
            <li><a href="/guides">Getting Started</a></li>
            <li><a href="/guides/best-practices">Best Practices</a></li>
            <li><a href="/maps">Compliance Mapping</a></li>
            <li><a href="/guides/tools">Tool Integration</a></li>
          </ul>
        </div>
        <div className="w3-third">
          <h3>Resources</h3>
          <ul className="w3-ul">
            <li><a href="/tools">Security Tools</a></li>
            <li><a href="/vendors">Vendor Documentation</a></li>
            <li><a href="/standards">Standards & Frameworks</a></li>
            <li><a href="/community">Community</a></li>
          </ul>
        </div>
        <div className="w3-third">
          <h3>About</h3>
          <ul className="w3-ul">
            <li><a href="/about">Our Mission</a></li>
            <li><a href="/contributing">Contributing</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="https://github.com/cp262808">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="w3-xlarge w3-section">
        <i className="fa fa-facebook-official w3-hover-opacity"></i>
        <i className="fa fa-instagram w3-hover-opacity"></i>
        <i className="fa fa-twitter w3-hover-opacity"></i>
        <i className="fa fa-linkedin w3-hover-opacity"></i>
      </div>
      <p className="w3-small">© 2024 Iron Codex. The world's largest cybersecurity reference platform.</p>
    </footer>
  )
}
