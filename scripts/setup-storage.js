
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase Environment Variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
    console.log('Checking storage buckets...');

    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error('Error listing buckets:', listError);
        process.exit(1);
    }

    const bucketName = 'artworks';
    const exists = buckets.find(b => b.name === bucketName);

    if (!exists) {
        console.log(`Bucket "${bucketName}" not found. Attempting to create...`);
        const { data, error } = await supabase.storage.createBucket(bucketName, {
            public: true,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
            fileSizeLimit: 5242880 // 5MB
        });

        if (error) {
            console.error('Error creating bucket:', error);
            console.log('\nPlease manually create a public bucket named "artworks" in your Supabase Dashboard:');
            console.log('1. Go to Storage');
            console.log('2. Click "New Bucket"');
            console.log('3. Name it "artworks"');
            console.log('4. Make it PUBLIC');
        } else {
            console.log(`Bucket "${bucketName}" created successfully!`);
        }
    } else {
        console.log(`Bucket "${bucketName}" already exists.`);
    }
}

setupStorage();
