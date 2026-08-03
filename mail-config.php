<?php
// ============================================================
//  ZOHO MAIL SMTP SETTINGS
//  Keep secrets out of Git. Provide them via environment vars
//  or a private, server-only configuration file.
// ============================================================
return [
    // --- SMTP server for YOUR Zoho region -------------------
    //   India   -> smtp.zoho.in    (you log in at mail.zoho.in)
    //   Global  -> smtp.zoho.com   (you log in at mail.zoho.com)
    //   Europe  -> smtp.zoho.eu    (you log in at mail.zoho.eu)
    //   Aus     -> smtp.zoho.com.au
    // If unsure, look at the URL when you open your Zoho inbox.
    'host'       => getenv('ZOHO_SMTP_HOST') ?: 'smtp.zoho.in',

    'port'       => (int) (getenv('ZOHO_SMTP_PORT') ?: 465), // 465 = SSL (recommended). Use 587 for TLS.
    'encryption' => getenv('ZOHO_SMTP_ENCRYPTION') ?: 'ssl',  // 'ssl' for port 465, 'tls' for port 587

    // --- The Zoho mailbox that authenticates & sends --------
    'username'   => getenv('ZOHO_SMTP_USERNAME') ?: 'legal@pareshravasa.in',

    // App-specific password from Zoho must come from an env var
    // or a private server-side config, never from Git.
    'password'   => getenv('ZOHO_SMTP_PASSWORD') ?: '',

    // --- From / To ------------------------------------------
    // 'from_email' MUST be the Zoho mailbox above (or a verified alias of it).
    'from_email' => getenv('ZOHO_FROM_EMAIL') ?: 'legal@pareshravasa.in',
    'from_name'  => getenv('ZOHO_FROM_NAME') ?: 'Website Enquiry',

    // Where enquiries are delivered (your inbox).
    'to_email'   => getenv('ZOHO_TO_EMAIL') ?: 'legal@pareshravasa.in',
    'to_name'    => getenv('ZOHO_TO_NAME') ?: 'Shah Paresh & Associates',
];
