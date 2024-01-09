import { crypto } from "https://deno.land/std@0.149.0/crypto/mod.ts";
import { decode as bd, encode as be } from "https://deno.land/std@0.149.0/encoding/base64.ts";
// Helper functions to encrypt / decrypt using AES with default config in CryptoJS
// NOTE: Encryption will be using SHA-384 instead of MD5 in Key Derivation, so it can't be decrypted using CryptoJS
// Decryption will try MD5 after SHA-384 generated key fails, so it can decrypt cipher text encrypted by CryptoJS
// For CryptoJS cipher text:
// It has a constant header for the first 8 byte.
// It has the salt in the second 8 byte.
// The rest is the cipher text.
// +----------+----------+-----------------+
// | Salted__ |  <salt>  |  <cipherText>   |
// +----------+----------+-----------------+
// |  64 bit  |  64 bit  | variable length |
// +----------+----------+-----------------+
// size in byte, same as CryptoJS's default.
const HEADER_SIZE = 8;
const SALT_SIZE = 8;
const KEY_SIZE = 32;
const IV_SIZE = 16;
export const encryptCryptoJSAES = async (plainText, passphrase, iterations = 1)=>{
    const salt = new Uint8Array(SALT_SIZE);
    crypto.getRandomValues(salt);
    const { key , iv  } = await EVPKDF(new TextEncoder().encode(passphrase), salt, "SHA-384", iterations);
    const cipherText = await crypto.subtle.encrypt({
        name: "AES-CBC",
        iv
    }, key, new TextEncoder().encode(plainText));
    // get the CryptoJS style cipher text.
    // "Salted__" + key + encryptedText
    return be(concatUint8Array(new TextEncoder().encode("Salted__"), salt, new Uint8Array(cipherText)));
};
// decrypt cipher text generated by default CryptoJS AES.
// cipher text should be in base64 (the default of CryptoJS's toString())
export const decryptCryptoJSAES = async (cipherTextBase64, passphrase, iterations = 1)=>{
    const cipherText = bd(cipherTextBase64);
    const { salt , body  } = parseCryptoJSCipherText(cipherText);
    const { key , iv  } = await EVPKDF(new TextEncoder().encode(passphrase), salt, "SHA-384", iterations);
    let plainText;
    try {
        plainText = await crypto.subtle.decrypt({
            name: "AES-CBC",
            iv
        }, key, body);
    } catch (_) {
        const { key: key1 , iv: iv1  } = await EVPKDF(new TextEncoder().encode(passphrase), salt, "MD5", iterations);
        plainText = await crypto.subtle.decrypt({
            name: "AES-CBC",
            iv: iv1
        }, key1, body);
    }
    return new TextDecoder().decode(plainText);
};
const parseCryptoJSCipherText = (cipherText)=>({
        salt: cipherText.subarray(HEADER_SIZE, HEADER_SIZE + SALT_SIZE),
        body: cipherText.subarray(HEADER_SIZE + SALT_SIZE, cipherText.length)
    });
// a customed version of EVPKDF using sha-384 instead of md5.
const EVPKDF = async (passphrase, salt, algorithm, iterations)=>{
    let rawKey = new Uint8Array();
    let block = new Uint8Array();
    while(rawKey.byteLength < KEY_SIZE + IV_SIZE){
        let buffer = await crypto.subtle.digest(algorithm, concatUint8Array(block, passphrase, salt));
        for(let i = 1; i < iterations; i++){
            buffer = await crypto.subtle.digest(algorithm, buffer);
        }
        block = new Uint8Array(buffer);
        rawKey = concatUint8Array(rawKey, block);
    }
    return {
        key: await crypto.subtle.importKey("raw", rawKey.subarray(0, KEY_SIZE), "AES-CBC", false, [
            "encrypt",
            "decrypt"
        ]),
        iv: rawKey.subarray(KEY_SIZE, rawKey.length)
    };
};
const concatUint8Array = (...arrays)=>{
    const size = arrays.reduce((len, array)=>len + array.length, 0);
    const merged = new Uint8Array(size);
    let mergedLen = 0;
    for (const array of arrays){
        merged.set(array, mergedLen);
        mergedLen += array.length;
    }
    return merged;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvb2FrX3Nlc3Npb25zQHY0LjEuOS9zcmMvY3J5cHRvLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyeXB0byB9IGZyb20gXCJodHRwczovL2Rlbm8ubGFuZC9zdGRAMC4xNDkuMC9jcnlwdG8vbW9kLnRzXCI7XG5pbXBvcnQge1xuICBkZWNvZGUgYXMgYmQsXG4gIGVuY29kZSBhcyBiZSxcbn0gZnJvbSBcImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE0OS4wL2VuY29kaW5nL2Jhc2U2NC50c1wiO1xuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIHRvIGVuY3J5cHQgLyBkZWNyeXB0IHVzaW5nIEFFUyB3aXRoIGRlZmF1bHQgY29uZmlnIGluIENyeXB0b0pTXG5cbi8vIE5PVEU6IEVuY3J5cHRpb24gd2lsbCBiZSB1c2luZyBTSEEtMzg0IGluc3RlYWQgb2YgTUQ1IGluIEtleSBEZXJpdmF0aW9uLCBzbyBpdCBjYW4ndCBiZSBkZWNyeXB0ZWQgdXNpbmcgQ3J5cHRvSlNcbi8vIERlY3J5cHRpb24gd2lsbCB0cnkgTUQ1IGFmdGVyIFNIQS0zODQgZ2VuZXJhdGVkIGtleSBmYWlscywgc28gaXQgY2FuIGRlY3J5cHQgY2lwaGVyIHRleHQgZW5jcnlwdGVkIGJ5IENyeXB0b0pTXG5cbi8vIEZvciBDcnlwdG9KUyBjaXBoZXIgdGV4dDpcbi8vIEl0IGhhcyBhIGNvbnN0YW50IGhlYWRlciBmb3IgdGhlIGZpcnN0IDggYnl0ZS5cbi8vIEl0IGhhcyB0aGUgc2FsdCBpbiB0aGUgc2Vjb25kIDggYnl0ZS5cbi8vIFRoZSByZXN0IGlzIHRoZSBjaXBoZXIgdGV4dC5cbi8vICstLS0tLS0tLS0tKy0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0rXG4vLyB8IFNhbHRlZF9fIHwgIDxzYWx0PiAgfCAgPGNpcGhlclRleHQ+ICAgfFxuLy8gKy0tLS0tLS0tLS0rLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLStcbi8vIHwgIDY0IGJpdCAgfCAgNjQgYml0ICB8IHZhcmlhYmxlIGxlbmd0aCB8XG4vLyArLS0tLS0tLS0tLSstLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tK1xuXG4vLyBzaXplIGluIGJ5dGUsIHNhbWUgYXMgQ3J5cHRvSlMncyBkZWZhdWx0LlxuY29uc3QgSEVBREVSX1NJWkUgPSA4O1xuY29uc3QgU0FMVF9TSVpFID0gODtcbmNvbnN0IEtFWV9TSVpFID0gMzI7XG5jb25zdCBJVl9TSVpFID0gMTY7XG5cbmV4cG9ydCBjb25zdCBlbmNyeXB0Q3J5cHRvSlNBRVMgPSBhc3luYyAoXG4gIHBsYWluVGV4dDogc3RyaW5nLFxuICBwYXNzcGhyYXNlOiBzdHJpbmcsXG4gIGl0ZXJhdGlvbnMgPSAxLFxuKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3Qgc2FsdCA9IG5ldyBVaW50OEFycmF5KFNBTFRfU0laRSk7XG4gIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoc2FsdCk7XG5cbiAgY29uc3QgeyBrZXksIGl2IH0gPSBhd2FpdCBFVlBLREYoXG4gICAgbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHBhc3NwaHJhc2UpLFxuICAgIHNhbHQsXG4gICAgXCJTSEEtMzg0XCIsXG4gICAgaXRlcmF0aW9ucyxcbiAgKTtcblxuICBjb25zdCBjaXBoZXJUZXh0ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5lbmNyeXB0KFxuICAgIHsgbmFtZTogXCJBRVMtQ0JDXCIsIGl2IH0sXG4gICAga2V5LFxuICAgIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShwbGFpblRleHQpLFxuICApO1xuXG4gIC8vIGdldCB0aGUgQ3J5cHRvSlMgc3R5bGUgY2lwaGVyIHRleHQuXG4gIC8vIFwiU2FsdGVkX19cIiArIGtleSArIGVuY3J5cHRlZFRleHRcbiAgcmV0dXJuIGJlKFxuICAgIGNvbmNhdFVpbnQ4QXJyYXkoXG4gICAgICBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoXCJTYWx0ZWRfX1wiKSxcbiAgICAgIHNhbHQsXG4gICAgICBuZXcgVWludDhBcnJheShjaXBoZXJUZXh0KSxcbiAgICApLFxuICApO1xufTtcblxuLy8gZGVjcnlwdCBjaXBoZXIgdGV4dCBnZW5lcmF0ZWQgYnkgZGVmYXVsdCBDcnlwdG9KUyBBRVMuXG4vLyBjaXBoZXIgdGV4dCBzaG91bGQgYmUgaW4gYmFzZTY0ICh0aGUgZGVmYXVsdCBvZiBDcnlwdG9KUydzIHRvU3RyaW5nKCkpXG5leHBvcnQgY29uc3QgZGVjcnlwdENyeXB0b0pTQUVTID0gYXN5bmMgKFxuICBjaXBoZXJUZXh0QmFzZTY0OiBzdHJpbmcsXG4gIHBhc3NwaHJhc2U6IHN0cmluZyxcbiAgaXRlcmF0aW9ucyA9IDEsXG4pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCBjaXBoZXJUZXh0ID0gYmQoY2lwaGVyVGV4dEJhc2U2NCk7XG5cbiAgY29uc3QgeyBzYWx0LCBib2R5IH0gPSBwYXJzZUNyeXB0b0pTQ2lwaGVyVGV4dChjaXBoZXJUZXh0KTtcblxuICBjb25zdCB7IGtleSwgaXYgfSA9IGF3YWl0IEVWUEtERihcbiAgICBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocGFzc3BocmFzZSksXG4gICAgc2FsdCxcbiAgICBcIlNIQS0zODRcIixcbiAgICBpdGVyYXRpb25zLFxuICApO1xuXG4gIGxldCBwbGFpblRleHQ6IEFycmF5QnVmZmVyO1xuICB0cnkge1xuICAgIHBsYWluVGV4dCA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGVjcnlwdChcbiAgICAgIHsgbmFtZTogXCJBRVMtQ0JDXCIsIGl2IH0sXG4gICAgICBrZXksXG4gICAgICBib2R5LFxuICAgICk7XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICBjb25zdCB7IGtleSwgaXYgfSA9IGF3YWl0IEVWUEtERihcbiAgICAgIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShwYXNzcGhyYXNlKSxcbiAgICAgIHNhbHQsXG4gICAgICBcIk1ENVwiLFxuICAgICAgaXRlcmF0aW9ucyxcbiAgICApO1xuXG4gICAgcGxhaW5UZXh0ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kZWNyeXB0KFxuICAgICAgeyBuYW1lOiBcIkFFUy1DQkNcIiwgaXYgfSxcbiAgICAgIGtleSxcbiAgICAgIGJvZHksXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUocGxhaW5UZXh0KTtcbn07XG5cbmNvbnN0IHBhcnNlQ3J5cHRvSlNDaXBoZXJUZXh0ID0gKGNpcGhlclRleHQ6IFVpbnQ4QXJyYXkpOiB7XG4gIHNhbHQ6IFVpbnQ4QXJyYXk7XG4gIGJvZHk6IFVpbnQ4QXJyYXk7XG59ID0+ICh7XG4gIHNhbHQ6IGNpcGhlclRleHQuc3ViYXJyYXkoSEVBREVSX1NJWkUsIEhFQURFUl9TSVpFICsgU0FMVF9TSVpFKSxcbiAgYm9keTogY2lwaGVyVGV4dC5zdWJhcnJheShIRUFERVJfU0laRSArIFNBTFRfU0laRSwgY2lwaGVyVGV4dC5sZW5ndGgpLFxufSk7XG5cbi8vIGEgY3VzdG9tZWQgdmVyc2lvbiBvZiBFVlBLREYgdXNpbmcgc2hhLTM4NCBpbnN0ZWFkIG9mIG1kNS5cbmNvbnN0IEVWUEtERiA9IGFzeW5jIChcbiAgcGFzc3BocmFzZTogVWludDhBcnJheSxcbiAgc2FsdDogVWludDhBcnJheSxcbiAgYWxnb3JpdGhtOiBcIlNIQS0zODRcIiB8IFwiTUQ1XCIsXG4gIGl0ZXJhdGlvbnM6IG51bWJlcixcbik6IFByb21pc2U8eyBrZXk6IENyeXB0b0tleTsgaXY6IFVpbnQ4QXJyYXkgfT4gPT4ge1xuICBsZXQgcmF3S2V5ID0gbmV3IFVpbnQ4QXJyYXkoKTtcbiAgbGV0IGJsb2NrID0gbmV3IFVpbnQ4QXJyYXkoKTtcblxuICB3aGlsZSAocmF3S2V5LmJ5dGVMZW5ndGggPCBLRVlfU0laRSArIElWX1NJWkUpIHtcbiAgICBsZXQgYnVmZmVyID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoXG4gICAgICBhbGdvcml0aG0sXG4gICAgICBjb25jYXRVaW50OEFycmF5KGJsb2NrLCBwYXNzcGhyYXNlLCBzYWx0KSxcbiAgICApO1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpdGVyYXRpb25zOyBpKyspIHtcbiAgICAgIGJ1ZmZlciA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KFxuICAgICAgICBhbGdvcml0aG0sXG4gICAgICAgIGJ1ZmZlcixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYmxvY2sgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICAgIHJhd0tleSA9IGNvbmNhdFVpbnQ4QXJyYXkocmF3S2V5LCBibG9jayk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGtleTogYXdhaXQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICBcInJhd1wiLFxuICAgICAgcmF3S2V5LnN1YmFycmF5KDAsIEtFWV9TSVpFKSxcbiAgICAgIFwiQUVTLUNCQ1wiLFxuICAgICAgZmFsc2UsXG4gICAgICBbXCJlbmNyeXB0XCIsIFwiZGVjcnlwdFwiXSxcbiAgICApLFxuICAgIGl2OiByYXdLZXkuc3ViYXJyYXkoS0VZX1NJWkUsIHJhd0tleS5sZW5ndGgpLFxuICB9O1xufTtcblxuY29uc3QgY29uY2F0VWludDhBcnJheSA9ICguLi5hcnJheXM6IFVpbnQ4QXJyYXlbXSk6IFVpbnQ4QXJyYXkgPT4ge1xuICBjb25zdCBzaXplID0gYXJyYXlzLnJlZHVjZSgobGVuLCBhcnJheSkgPT4gbGVuICsgYXJyYXkubGVuZ3RoLCAwKTtcblxuICBjb25zdCBtZXJnZWQgPSBuZXcgVWludDhBcnJheShzaXplKTtcblxuICBsZXQgbWVyZ2VkTGVuID0gMDtcbiAgZm9yIChjb25zdCBhcnJheSBvZiBhcnJheXMpIHtcbiAgICBtZXJnZWQuc2V0KGFycmF5LCBtZXJnZWRMZW4pO1xuICAgIG1lcmdlZExlbiArPSBhcnJheS5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkO1xufTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLE1BQU0sUUFBUSw4Q0FBOEM7QUFDckUsU0FDRSxVQUFVLEVBQUUsRUFDWixV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