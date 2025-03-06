// pages/[[...path]].js
import { useRouter } from 'next/router';
import ErrorPage from './404';

export default function CatchAllPage() {
  const router = useRouter();
  
  // Just render the 404 page for any unmatched route
  return <ErrorPage />;
}

export function getStaticProps() {
  return {
    props: {}
  };
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}