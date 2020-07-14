import Link from '~/components/global/Link/Link';

function Test() {
  return (
    <div style={{ color: '#000', minHeight: '100vh', paddingTop: 100 }}>
      <Link href="https://checkout.simpletire.com/MyCart/add/101941/4">
        <span style={{ color: '#000' }}>Add to cart</span>
      </Link>
    </div>
  );
}

export default Test;
