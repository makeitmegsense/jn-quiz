'use client';

import { useState } from 'react';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import { Download, Loader2 } from 'lucide-react';

async function generateCertificate(name) {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    const templateImage = new Image();
    templateImage.crossOrigin = 'anonymous';

    return new Promise((resolve, reject) => {
      templateImage.onload = () => {
        canvas.width = templateImage.width;
        canvas.height = templateImage.height;

        // Draw certificate template
        ctx.drawImage(templateImage, 0, 0);

        // =========================
        // NAME
        // =========================
        ctx.fillStyle = '#17365d';
        ctx.font = 'bold 76px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Center horizontally
        const nameX = canvas.width / 2;

        // Name position
        const nameY = canvas.height * 0.52;

        ctx.fillText(name, nameX, nameY);

        // =========================
        // EXPORT
        // =========================
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(URL.createObjectURL(blob));
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          'image/jpeg',
          0.9
        );
      };

      templateImage.onerror = () =>
        reject(new Error('Failed to load certificate template'));

      templateImage.src = '/Certificate.png';
    });
  } catch {
    return null;
  }
}

export default function CertificateTestPage() {
  const [name, setName] = useState('Jawaharlal Nehru');
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!name.trim()) return;

    setLoading(true);

    if (certificateUrl) {
      URL.revokeObjectURL(certificateUrl);
      setCertificateUrl(null);
    }

    const url = await generateCertificate(name.trim());

    setCertificateUrl(url);
    setLoading(false);
  };

  const handleDownload = () => {
    if (!certificateUrl) return;

    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = `${name.trim()}_Certificate.jpeg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen pt-28 pb-20 px-4 sm:px-6"
        style={{
          background:
            'linear-gradient(160deg,#f5f2ff 0%,#efeaff 50%,#faf8ff 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <p
              className="mb-3"
              style={{
                color: '#17365d',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              LOCAL TEST
            </p>

            <h1
              style={{
                color: '#10243f',
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '10px',
              }}
            >
              Certificate Preview
            </h1>

            <p
              style={{
                color: '#5d6f8c',
                fontSize: '14px',
              }}
            >
              Test the certificate name placement without completing the quiz.
            </p>
          </div>

          {/* Controls */}
          <div
            className="max-w-xl mx-auto rounded-3xl p-6 sm:p-8 mb-10"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(23,54,93,0.10)',
              boxShadow: '0 8px 30px rgba(23,54,93,0.08)',
            }}
          >
            <label
              className="block mb-2"
              style={{
                color: '#2c4a73',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Certificate Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleGenerate();
                }
              }}
              placeholder="Enter name"
              className="w-full"
              style={{
                background: '#FFFFFF',
                border: '2px solid rgba(23,54,93,0.15)',
                borderRadius: '12px',
                padding: '14px 16px',
                color: '#10243f',
                fontSize: '15px',
                outline: 'none',
              }}
            />

            <button
              onClick={handleGenerate}
              disabled={!name.trim() || loading}
              className="w-full mt-4"
              style={{
                background:
                  name.trim() && !loading
                    ? 'linear-gradient(135deg,#17365d,#234a7d)'
                    : 'rgba(23,54,93,0.08)',
                color:
                  name.trim() && !loading
                    ? '#FFFFFF'
                    : '#8b82b8',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 20px',
                fontSize: '14px',
                fontWeight: '700',
                cursor:
                  name.trim() && !loading
                    ? 'pointer'
                    : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Generating...
                </>
              ) : (
                'Generate Certificate'
              )}
            </button>
          </div>

          {/* Certificate Preview */}
          {certificateUrl && (
            <div
              className="rounded-3xl p-4 sm:p-6"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(23,54,93,0.10)',
                boxShadow: '0 8px 30px rgba(23,54,93,0.08)',
              }}
            >
              <div
                className="text-center mb-5"
                style={{
                  color: '#10243f',
                  fontSize: '15px',
                  fontWeight: '700',
                }}
              >
                Certificate Preview
              </div>

              <div
                className="w-full overflow-hidden rounded-xl"
                style={{
                  border: '1px solid rgba(23,54,93,0.12)',
                  background: '#f8f8f8',
                }}
              >
                <img
                  src={certificateUrl}
                  alt="Certificate Preview"
                  className="w-full h-auto block"
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                  style={{
                    background:
                      'linear-gradient(135deg,#17365d,#234a7d)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '13px 22px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow:
                      '0 4px 16px rgba(23,54,93,0.25)',
                  }}
                >
                  <Download size={16} />
                  Download Certificate
                </button>
              </div>
            </div>
          )}

          {/* Initial state */}
          {!certificateUrl && !loading && (
            <div
              className="text-center py-12"
              style={{
                color: '#8b82b8',
                fontSize: '13px',
              }}
            >
              Enter a name above and generate the certificate
              to preview the placement.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}