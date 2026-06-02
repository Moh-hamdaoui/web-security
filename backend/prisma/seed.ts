import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.repairOrder.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      email: "user1@test.local",
      passwordHash: "Password123!",
      displayName: "Camille Martin",
      phone: "+33 6 12 34 56 10",
      role: "customer",
      isAdmin: false,
      internalNote: "Client flotte familiale, préfère les rendez-vous le matin."
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@test.local",
      passwordHash: "Password123!",
      displayName: "Nora Bernard",
      phone: "+33 6 12 34 56 20",
      role: "customer",
      isAdmin: false,
      internalNote: "Demande toujours un devis avant validation."
    }
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@test.local",
      passwordHash: "Admin123!",
      displayName: "Alex Admin",
      phone: "+33 1 44 55 66 77",
      role: "admin",
      isAdmin: true,
      internalNote: "Compte gestion atelier."
    }
  });

  const vehicles = await prisma.vehicle.createManyAndReturn({
    data: [
      {
        ownerId: user1.id,
        brand: "Renault",
        model: "Clio V",
        plateNumber: "GH-214-AA",
        vin: "VF1RJA00368123456",
        mileage: 42150
      },
      {
        ownerId: user1.id,
        brand: "Peugeot",
        model: "308",
        plateNumber: "GH-842-BB",
        vin: "VR3F3HNSTPY123456",
        mileage: 68720
      },
      {
        ownerId: user2.id,
        brand: "Citroen",
        model: "C3 Aircross",
        plateNumber: "GH-510-CC",
        vin: "VF7SXHNSRJT123456",
        mileage: 31080
      },
      {
        ownerId: user2.id,
        brand: "Toyota",
        model: "Yaris",
        plateNumber: "GH-099-DD",
        vin: "VNKKG3D3X0A123456",
        mileage: 55200
      }
    ]
  });

  const clio = vehicles[0];
  const peugeot = vehicles[1];
  const citroen = vehicles[2];
  const toyota = vehicles[3];

  const orders = await prisma.repairOrder.createManyAndReturn({
    data: [
      {
        userId: user1.id,
        vehicleId: clio.id,
        title: "Vidange annuelle",
        description: "Remplacement huile moteur, filtre à huile et contrôle des niveaux.",
        status: "Terminé",
        totalPrice: 129.9,
        internalStatus: "Facture envoyée"
      },
      {
        userId: user1.id,
        vehicleId: peugeot.id,
        title: "Contrôle freinage",
        description: "Diagnostic bruit au freinage et mesure usure plaquettes avant.",
        status: "En cours",
        totalPrice: 74.5,
        internalStatus: "Attente validation devis"
      },
      {
        userId: user1.id,
        vehicleId: clio.id,
        title: "Remplacement pneus",
        description: "Montage équilibrage pneus été avec recyclage des anciens pneus.",
        status: "Planifié",
        totalPrice: 389,
        internalStatus: "Commande fournisseur OK"
      },
      {
        userId: user2.id,
        vehicleId: citroen.id,
        title: "Révision constructeur",
        description: "Révision complète avec remplacement filtre habitacle et filtre air.",
        status: "Terminé",
        totalPrice: 249.9,
        internalStatus: "Garantie vérifiée"
      },
      {
        userId: user2.id,
        vehicleId: toyota.id,
        title: "Diagnostic batterie",
        description: "Test alternateur, batterie et circuit de charge.",
        status: "En attente",
        totalPrice: 49,
        internalStatus: "Appel client prévu"
      },
      {
        userId: user2.id,
        vehicleId: citroen.id,
        title: "Climatisation",
        description: "Recherche fuite, recharge gaz et remplacement filtre habitacle.",
        status: "En cours",
        totalPrice: 169.5,
        internalStatus: "Traceur injecté"
      }
    ]
  });

  await prisma.comment.createMany({
    data: [
      { orderId: orders[0].id, userId: user1.id, content: "Merci, je récupère le véhicule ce soir." },
      { orderId: orders[1].id, userId: user1.id, content: "Pouvez-vous m'appeler avant toute commande de pièces ?" },
      { orderId: orders[3].id, userId: user2.id, content: "Facture reçue, merci pour la prise en charge." },
      { orderId: orders[4].id, userId: user2.id, content: "Je peux déposer la voiture demain matin." },
      { orderId: orders[5].id, userId: admin.id, content: "Prévoir contrôle visuel après recharge." }
    ]
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
