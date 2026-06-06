export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12 py-6 text-center text-xs text-gray-400 space-y-2">
      <p>© {new Date().getFullYear()} PeacePath Capstone Application. Built for Mental Wellness Awareness.</p>
      <p className="italic text-gray-300">"Be kind to your mind."</p>
    </footer>
  );
}