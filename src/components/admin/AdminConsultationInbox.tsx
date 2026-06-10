"use client";

import {
  CheckCircle2,
  ChevronRight,
  Circle,
  Inbox,
  MailOpen,
  PhoneCall,
  Square,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ConsultationRequest, ConsultationStatus } from "@/lib/consultations";
import { AdminLogoutButton } from "./AdminLogoutButton";

function formatDate(iso: string) {
  const date = new Date(iso.includes("T") ? iso : `${iso.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatShortDate(iso: string) {
  const date = new Date(iso.includes("T") ? iso : `${iso.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function statusLabel(status: ConsultationStatus) {
  if (status === "reached_out") return "Reached out";
  if (status === "read") return "Read";
  return "New";
}

function filterLabel(filter: Filter) {
  if (filter === "all") return "All consultation requests";
  if (filter === "favorite") return "Starred consultation requests";
  return statusLabel(filter);
}

type Props = {
  requests: ConsultationRequest[];
};

type Filter = "all" | "favorite" | ConsultationStatus;

export function AdminConsultationInbox({ requests }: Props) {
  const [items, setItems] = useState(requests);
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const selected = selectedId
    ? (items.find((request) => request.id === selectedId) ?? null)
    : null;

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "favorite") return items.filter((request) => request.isFavorite);
    return items.filter((request) => request.status === filter);
  }, [filter, items]);

  async function updateStatus(
    id: number,
    action: "mark_read" | "mark_reached_out" | "unmark_reached_out",
  ) {
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) return;

      const now = new Date().toISOString();
      setItems((current) =>
        current.map((request) => {
          if (request.id !== id) return request;
          if (action === "mark_reached_out") {
            return {
              ...request,
              status: "reached_out",
              readAt: request.readAt ?? now,
              reachedOutAt: request.reachedOutAt ?? now,
            };
          }
          if (action === "unmark_reached_out") {
            return {
              ...request,
              status: "read",
              readAt: request.readAt ?? now,
              reachedOutAt: null,
            };
          }
          if (request.status !== "new") return request;
          return { ...request, status: "read", readAt: request.readAt ?? now };
        }),
      );
    } finally {
      setPendingId(null);
    }
  }

  async function setFavorite(id: number, isFavorite: boolean) {
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set_favorite", isFavorite }),
      });

      if (!res.ok) return;

      setItems((current) =>
        current.map((request) =>
          request.id === id ? { ...request, isFavorite } : request,
        ),
      );
    } finally {
      setPendingId(null);
    }
  }

  async function deleteRequest(id: number) {
    const request = items.find((item) => item.id === id);
    const confirmed = window.confirm(
      `Delete consultation request${request ? ` from ${request.name}` : ""}?`,
    );
    if (!confirmed) return;

    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) return;

      setItems((current) => current.filter((item) => item.id !== id));
      if (selectedId === id) {
        setSelectedId(null);
      }
    } finally {
      setPendingId(null);
    }
  }

  function selectRequest(request: ConsultationRequest) {
    setSelectedId(request.id);
    if (request.status === "new") {
      void updateStatus(request.id, "mark_read");
    }
  }

  const filters: {
    id: Filter;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "all", label: "All", icon: Inbox },
    { id: "favorite", label: "Starred", icon: Star },
    { id: "new", label: "New", icon: Circle },
    { id: "read", label: "Read", icon: MailOpen },
    { id: "reached_out", label: "Reached out", icon: CheckCircle2 },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5DC] md:text-4xl">
            Consultation Inbox
          </h1>
        </div>
        <AdminLogoutButton />
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#1A1A1A] to-black p-10 text-center">
          <p className="text-[#F5F5DC]/70">
            New consultation submissions from the contact form will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-slate-900 shadow-2xl lg:grid-cols-[220px_1fr]">
            <aside className="border-b border-slate-200 bg-slate-50 p-4 lg:border-b-0 lg:border-r">
              <nav className="space-y-1">
              {filters.map((item) => {
                const Icon = item.icon;
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`flex w-full items-center justify-between rounded-full px-4 py-3 text-sm transition ${
                      active
                        ? "bg-amber-100 font-semibold text-slate-950"
                        : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-950"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                  </button>
                );
              })}
              </nav>
            </aside>

            <section className="min-h-[560px] overflow-hidden bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
                <span>{filterLabel(filter)}</span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="p-8 text-sm text-slate-500">
                  No {filter === "all" ? "" : filterLabel(filter).toLowerCase()} here.
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {filteredItems.map((request) => {
                    const isNew = request.status === "new";
                    return (
                      <div
                        key={request.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => selectRequest(request)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            selectRequest(request);
                          }
                        }}
                        className={`grid w-full grid-cols-[24px_24px_18px_minmax(120px,220px)_1fr_auto] items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:relative hover:z-10 hover:bg-slate-50 hover:shadow-sm ${
                          isNew ? "bg-white font-semibold" : "bg-slate-50/70"
                        }`}
                      >
                        <Square className="h-4 w-4 text-slate-300" />
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            void setFavorite(request.id, !request.isFavorite);
                          }}
                          disabled={pendingId === request.id}
                          className={`rounded p-0.5 transition hover:bg-slate-200 disabled:cursor-wait disabled:opacity-60 ${
                            request.isFavorite ? "text-amber-400" : "text-slate-300"
                          }`}
                          aria-label={
                            request.isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <Star
                            className="h-4 w-4"
                            fill={request.isFavorite ? "currentColor" : "none"}
                          />
                        </button>
                        <ChevronRight
                          className={`h-4 w-4 ${
                            request.status === "reached_out"
                              ? "text-emerald-500"
                              : isNew
                                ? "text-amber-400"
                                : "text-slate-300"
                          }`}
                        />
                        <span
                          className={`truncate ${
                            isNew ? "text-slate-950" : "text-slate-700"
                          }`}
                        >
                          {request.name}
                        </span>
                        <span className="min-w-0 truncate text-slate-700">
                          <span className={isNew ? "text-slate-950" : "text-slate-600"}>
                            Consultation request
                          </span>
                          <span className="px-1 text-slate-400">-</span>
                          <span className="text-slate-500">{request.message}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-3">
                          <span
                            className={`text-xs ${
                              isNew ? "font-semibold text-slate-950" : "text-slate-500"
                            }`}
                          >
                            {formatShortDate(request.createdAt)}
                          </span>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              void deleteRequest(request.id);
                            }}
                            disabled={pendingId === request.id}
                            className="rounded p-1 text-slate-300 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-wait disabled:opacity-60"
                            aria-label="Delete request"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {selected ? (
            <div className="fixed inset-0 z-50 bg-black/70 px-4 py-6 backdrop-blur-sm">
              <div className="mx-auto flex max-h-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Full consultation request
                    </p>
                    <h2 className="text-xl font-semibold text-slate-950">{selected.name}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Close request"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <article className="overflow-y-auto p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                        {statusLabel(selected.status)}
                      </span>
                      <p className="mt-3 text-sm text-slate-500">
                        Submitted {formatDate(selected.createdAt)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setFavorite(selected.id, !selected.isFavorite)}
                        disabled={pendingId === selected.id}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
                      >
                        <Star
                          className="h-4 w-4 text-amber-400"
                          fill={selected.isFavorite ? "currentColor" : "none"}
                        />
                        {selected.isFavorite ? "Starred" : "Star"}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          updateStatus(
                            selected.id,
                            selected.status === "reached_out"
                              ? "unmark_reached_out"
                              : "mark_reached_out",
                          )
                        }
                        disabled={pendingId === selected.id}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
                          selected.status === "reached_out"
                            ? "border border-slate-200 text-slate-700 hover:bg-slate-50"
                            : "bg-amber-400 text-slate-950 hover:bg-amber-300"
                        }`}
                      >
                        <PhoneCall className="h-4 w-4" />
                        {selected.status === "reached_out"
                          ? "Remove Reached Out"
                          : "Mark Reached Out"}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteRequest(selected.id)}
                        disabled={pendingId === selected.id}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">Phone</dt>
                      <dd className="mt-2">
                        <a
                          href={`tel:${selected.phone.replace(/\D/g, "")}`}
                          className="font-medium text-blue-700 transition hover:underline"
                        >
                          {selected.phone}
                        </a>
                      </dd>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">Email</dt>
                      <dd className="mt-2">
                        <a
                          href={`mailto:${selected.email}`}
                          className="break-all font-medium text-blue-700 transition hover:underline"
                        >
                          {selected.email}
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Project details
                    </p>
                    <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-800">
                      {selected.message}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
                    <p>Read: {selected.readAt ? formatDate(selected.readAt) : "Not yet"}</p>
                    <p>
                      Reached out:{" "}
                      {selected.reachedOutAt ? formatDate(selected.reachedOutAt) : "Not yet"}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
