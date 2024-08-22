import { Offering, Partnership } from "@/components/detail-transaction";
import {
  checkAuthValidity,
  createEntry,
  getChurchByEmail,
} from "@/lib/queries";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const contentType = req.headers.get("content-type");
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { error: "Authorization token is required" },
      { status: 401 },
    );
  }

  const validity = await checkAuthValidity(
    session?.user?.email!,
    authorization,
  );
  if (!validity) {
    return NextResponse.json(
      { error: "Invalid authorization token" },
      { status: 401 },
    );
  }

  if (contentType !== "application/json") {
    return NextResponse.json(
      { error: "Invalid content type" },
      { status: 415 },
    );
  }

  const body = await req.json();
  const {
    name,
    partnerships = [],
    offerings = [],
    member_id,
  }: {
    name: string;
    partnerships: Partnership[];
    offerings: Offering[];
    member_id: string;
  } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!member_id) {
    return NextResponse.json(
      { error: "Member ID is required" },
      { status: 400 },
    );
  }

  const churchId = await getChurchByEmail(session?.user?.email!);

  for (const p of partnerships) {
    if (!p.partnership_arm || !p.amount) {
      return NextResponse.json(
        { error: "Partnership arm and amount are required" },
        { status: 400 },
      );
    }

    try {
      await createEntry({
        memberId: member_id,
        churchId: churchId!,
        category: "partnership",
        date: new Date().toISOString(),
        amount: Number(p.amount),
        paymentMethod: p.payment_method,
        reference: p?.kingspay_number || null,
        chequeNumber: p?.cheque_number || null,
        cashDenominations: p?.denominations || null,
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to create partnership entry." },
        { status: 500 },
      );
    }
  }

  for (const o of offerings) {
    if (!o.offering_type || !o.amount) {
      return NextResponse.json(
        { error: "Offering type and amount are required" },
        { status: 400 },
      );
    }

    try {
      await createEntry({
        memberId: member_id,
        churchId: church_id,
        category: "offering",
        date: new Date().toISOString(),
        amount: o.amount,
        paymentMethod: o.payment_method,
        reference: o?.kingspay_number || null,
        chequeNumber: o?.cheque_number || null,
        cashDenominations: o?.denominations || null,
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to create offering entry." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { message: "Successfully created transaction." },
    { status: 200 },
  );
}
