import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        roomCount,
        bathroomCount,
        category,
        guestCount,
        location,
        price,
        tournamentDate
    } = body;


    // Object.keys(body).forEach((value:any) => {
    //     if(!body[value]){
    //         NextResponse.error();
    //     }
    // });

    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            tournamentDate,
            locationValue: location.value,
            price: parseInt(price,10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing)


}