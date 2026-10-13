export default function Header({ exe, tagline }) {
  return (
    <header className="site-header">
      <p className="exe">
        <span aria-hidden="true">&gt; </span>
        {exe}
      </p>
      <p className="tagline">{tagline}</p>
    </header>
  )
}
