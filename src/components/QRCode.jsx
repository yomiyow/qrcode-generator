function QRCode({ url, onQrLoad }) {
  return (
    url && (
      <img src={url} onLoad={onQrLoad} />
    )
  );
}

export default QRCode;
