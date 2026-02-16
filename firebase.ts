// Fixed: Ensured initializeApp is correctly imported from 'firebase/app' and removed empty lines that might cause resolution issues.
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  getCountFromServer
} from "firebase/firestore";
import { Appointment } from './types';

/**
 * Firebase Configuration
 */
const firebaseConfig = {
  // Fixed: Obtained API key from environment variable as per global guidelines.
  apiKey: process.env.API_KEY, 
  authDomain: "rabby-41829.firebaseapp.com",
  projectId: "rabby-41829",
  storageBucket: "rabby-41829.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export class FirebaseService {
  private appointmentsCol = collection(db, "appointments");

  async addAppointment(patient: Omit<Appointment, 'id' | 'serialNumber' | 'timestamp' | 'status'>): Promise<Appointment> {
    try {
      const dailyQuery = query(this.appointmentsCol, where("date", "==", patient.date));
      const snapshot = await getCountFromServer(dailyQuery);
      // Serial number starts from 03 (count + 3)
      const nextSerial = Number(snapshot.data().count) + 3;

      const appointmentData = {
        ...patient,
        serialNumber: nextSerial,
        timestamp: serverTimestamp(),
        status: 'pending' as const
      };

      const docRef = await addDoc(this.appointmentsCol, appointmentData);
      
      return {
        ...appointmentData,
        id: docRef.id,
        timestamp: new Date().toISOString()
      } as Appointment;
    } catch (error) {
      console.error("Error adding appointment: ", error);
      throw error;
    }
  }

  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const q = query(this.appointmentsCol, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : data.timestamp
        };
      }) as Appointment[];
    } catch (error) {
      console.error("Error getting appointments: ", error);
      return [];
    }
  }

  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    try {
      const docRef = doc(db, "appointments", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : data.timestamp
        } as Appointment;
      }
      return undefined;
    } catch (error) {
      console.error("Error getting appointment: ", error);
      return undefined;
    }
  }

  async getAppointmentsByPhone(phone: string): Promise<Appointment[]> {
    try {
      const q = query(this.appointmentsCol, where("phone", "==", phone));
      const querySnapshot = await getDocs(q);
      
      const results = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : data.timestamp
        };
      }) as Appointment[];

      return results.sort((a, b) => {
        const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return timeB - timeA;
      });
    } catch (error) {
      console.error("Error searching by phone: ", error);
      return [];
    }
  }
}

export const dbService = new FirebaseService();