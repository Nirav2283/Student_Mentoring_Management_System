// Shared email template wrapper for Mentora emails
// Provides a consistent, premium look across all email types

/**
 * Wraps email body content in a branded Mentora email template.
 * Uses inline styles only (email client compatibility).
 * Yellow/black theme matching the Mentora web UI.
 */
export function mentoraEmailTemplate({
  preheader = "",
  body,
}: {
  preheader?: string;
  body: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Mentora</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#f5f5f0; font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; -webkit-font-smoothing:antialiased;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">${preheader}</div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5f5f0; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px; width:100%;">

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="width:40px; height:40px; background-color:#f5c518; border-radius:10px; text-align:center; vertical-align:middle; font-size:20px; font-weight:800; color:#1a1a1a; font-family:'Segoe UI',Arial,sans-serif;">
                    M
                  </td>
                  <td style="padding-left:12px; font-size:22px; font-weight:700; color:#1a1a1a; letter-spacing:-0.5px; font-family:'Segoe UI',Arial,sans-serif;">
                    Mentora
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background-color:#ffffff; border-radius:16px; border:1px solid #e8e5de; box-shadow:0 1px 3px rgba(0,0,0,0.06); overflow:hidden;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 20px 0; text-align:center;">
              <p style="margin:0 0 6px; font-size:12px; color:#9ca3af; font-family:'Segoe UI',Arial,sans-serif;">
                © ${new Date().getFullYear()} Mentora Inc. All rights reserved.
              </p>
              <p style="margin:0; font-size:11px; color:#b5b3ab; font-family:'Segoe UI',Arial,sans-serif;">
                This is an automated email. If you didn't expect this, please contact support.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Renders a prominent CTA button in Mentora yellow */
export function mentoraButton(href: string, label: string) {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
      <tr>
        <td style="background-color:#f5c518; border-radius:10px; text-align:center;">
          <a href="${href}" target="_blank" style="display:inline-block; padding:14px 36px; font-size:15px; font-weight:700; color:#1a1a1a; text-decoration:none; font-family:'Segoe UI',Arial,sans-serif;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

/** Renders an info/credentials box */
export function mentoraInfoBox(content: string) {
  return `
    <div style="background-color:#fefce8; border:1px dashed #f5c518; border-radius:12px; padding:24px; margin:24px 0;">
      ${content}
    </div>`;
}

/** Renders a label + value pair inside an info box */
export function mentoraField(label: string, value: string) {
  return `
    <div style="margin-bottom:14px;">
      <div style="font-size:11px; color:#92845a; text-transform:uppercase; letter-spacing:0.08em; font-weight:700; margin-bottom:3px; font-family:'Segoe UI',Arial,sans-serif;">${label}</div>
      <div style="font-size:16px; color:#1a1a1a; font-weight:600; font-family:'Consolas','Monaco',monospace;">${value}</div>
    </div>`;
}
