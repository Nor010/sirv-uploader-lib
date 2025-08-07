export async function uploadToSirvWithProgress(
  file: File,
  uploadPath: string,
  onProgress: (progress: number) => void,
  clientId: string,
  clientSecret: string
) {
  const authRes = await fetch("https://api.sirv.com/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ clientId, clientSecret }),
  });
  if (!authRes.ok) {
    throw new Error(
      `Token request failed (${authRes.status}): ${await authRes.text()}`
    );
  }

  const { token } = await authRes.json();
  if (!token) throw new Error("Sirv did not return a token.");

  const safePath = uploadPath.endsWith("/") ? uploadPath : `${uploadPath}/`;
  const url = `https://api.sirv.com/v2/files/upload?filename=${encodeURIComponent(
    `${safePath}${file.name}`
  )}`;

  const xhr = new XMLHttpRequest();
  const promise = new Promise<void>((resolve, reject) => {
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && e.total > 0)
        onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? (onProgress(100), resolve())
        : reject(
            new Error(`Upload failed (${xhr.status}): ${xhr.responseText}`)
          );
    xhr.onerror = () => reject(new Error("Network error during upload"));
  });

  xhr.open("POST", url);
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  // Optional: xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
  xhr.send(file);

  return promise;
}
