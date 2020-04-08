import Layout from './Layout';

export default {
  component: Layout,
  title: 'Layout',
};

export function Text() {
  return <Layout>Hello Layout</Layout>;
}

export function Emoji() {
  return (
    <Layout>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Layout>
  );
}
