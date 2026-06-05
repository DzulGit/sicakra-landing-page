const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Package {
  id: string;
  name: string;
  description: string | null;
  price: number;
  speedDown: number;
  speedUp: number;
  features: string[];
  status: 'ACTIVE' | 'INACTIVE';
  sortOrder: number;
}

export interface RegistrationPayload {
  fullName: string;
  phone: string;
  email: string;
  job: string;
  ktpNumber?: string;
  address: string;
  rtRw: string;
  village: string;
  district: string;
  city: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  mapsUrl?: string;
  buildingType: 'RUMAH' | 'KONTRAKAN' | 'KOS' | 'RUKO' | 'KANTOR' | 'SEKOLAH';
  ownershipStatus: 'MILIK_SENDIRI' | 'SEWA_KONTRAK';
  packageId: string;
  surveyDate?: string;
  surveyTime?: string;
  notes?: string;
  ktpPhotoUrl?: string;
  housePhotoUrl?: string;
}

export async function getPackages(): Promise<Package[]> {
  const res = await fetch(`${API_URL}/packages?onlyActive=true`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Gagal mengambil data paket');
  return res.json();
}

export async function submitRegistration(payload: RegistrationPayload) {
  const res = await fetch(`${API_URL}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Gagal mengirim pendaftaran');
  }

  return data;
}

export async function uploadFile(file: File, type: 'ktp' | 'house'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const endpoint = type === 'ktp' ? 'upload/ktp' : 'upload/house';

  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Gagal mengupload file');
  }

  return data.url;
}